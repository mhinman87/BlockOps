#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import { XR_TRAINING_TASKS, XR_TRAINING_DEPENDENCIES, XR_TRAINING_COLLABORATORS } from '../src/services/xrTrainingProjectSeed.js';
const url=process.env.SUPABASE_URL||process.env.VITE_SUPABASE_URL;
const key=process.env.SUPABASE_SERVICE_ROLE_KEY||process.env.SUPABASE_SERVICE_KEY;
const verifyOnly=process.env.VERIFY_ONLY==='1';
if(!url||!key) throw new Error('Supabase URL and service role key are required');
const c=createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
const fail=(label,error)=>{if(error) throw new Error(`${label}: ${error.message}`)};
const statusSummary=rows=>rows.reduce((a,r)=>(a[r.status]=(a[r.status]||0)+1,a),{});
async function read(){
 const [m,t,d,kc]=await Promise.all([
  c.from('launch_milestones').select('id,slug'),
  c.from('launch_tasks_v2').select('id,task_key,status,workstream,milestone_id,primary_owner'),
  c.from('launch_task_dependencies').select('task_id,depends_on_task_id,dependency_type'),
  c.from('launch_task_collaborators').select('task_id,collaborator')]);
 for(const [n,r] of [['milestones',m],['tasks',t],['dependencies',d],['collaborators',kc]]) fail(`read ${n}`,r.error);
 return {milestones:m.data||[],tasks:t.data||[],dependencies:d.data||[],collaborators:kc.data||[]};
}
function report(all){
 const keys=new Set(XR_TRAINING_TASKS.map(x=>x.taskKey));
 const rows=all.tasks.filter(x=>keys.has(x.task_key));
 const ids=new Set(rows.map(x=>x.id));
 const wf=rows.reduce((a,r)=>(a[r.workstream]=(a[r.workstream]||0)+1,a),{});
 const expectedWf=XR_TRAINING_TASKS.reduce((a,r)=>(a[r.workstream]=(a[r.workstream]||0)+1,a),{});
 const byMilestone=Object.fromEntries(all.milestones.map(m=>[m.slug,rows.filter(r=>r.milestone_id===m.id).length]));
 const out={expected:{tasks:XR_TRAINING_TASKS.length,dependencies:XR_TRAINING_DEPENDENCIES.length,collaborators:XR_TRAINING_COLLABORATORS.length,workflows:expectedWf},live:{projectTasks:rows.length,dependencies:all.dependencies.filter(x=>ids.has(x.task_id)).length,collaborators:all.collaborators.filter(x=>ids.has(x.task_id)).length,statuses:statusSummary(rows),byMilestone,workflows:wf,missingMilestone:rows.filter(x=>!x.milestone_id).length,thisWeek:rows.filter(x=>x.status==='this_week').length},matches:{allTasks:rows.length===XR_TRAINING_TASKS.length,allDependencies:all.dependencies.filter(x=>ids.has(x.task_id)).length===XR_TRAINING_DEPENDENCIES.length,allCollaborators:all.collaborators.filter(x=>ids.has(x.task_id)).length===XR_TRAINING_COLLABORATORS.length,workflowCounts:JSON.stringify(wf)===JSON.stringify(expectedWf),noMissingMilestone:rows.every(x=>x.milestone_id),noThisWeek:rows.every(x=>x.status!=='this_week')}};
 console.log(JSON.stringify(out,null,2));
 if(!Object.values(out.matches).every(Boolean)) process.exitCode=2;
}
const before=await read();
if(verifyOnly){report(before);process.exit();}
const mid=new Map(before.milestones.map(x=>[x.slug,x.id]));
const payload=XR_TRAINING_TASKS.map(x=>({task_key:x.taskKey,title:x.title,description:x.description,primary_owner:x.primaryOwner,status:x.status,priority:x.priority,workstream:x.workstream,milestone_id:mid.get(x.milestoneSlug),compliance_flag:x.complianceFlag,legal_gate_flag:x.legalGateFlag,changed_by_new_info:x.changedByNewInfo,sort_order:x.sortOrder,completed_at:null}));
let r=await c.from('launch_tasks_v2').upsert(payload,{onConflict:'task_key'}); fail('upsert project tasks',r.error);
const afterTasks=await c.from('launch_tasks_v2').select('id,task_key').in('task_key',XR_TRAINING_TASKS.map(x=>x.taskKey)); fail('read project task ids',afterTasks.error);
const id=new Map((afterTasks.data||[]).map(x=>[x.task_key,x.id])); const ids=[...id.values()];
if(ids.length){r=await c.from('launch_task_dependencies').delete().in('task_id',ids);fail('replace project dependencies',r.error);r=await c.from('launch_task_collaborators').delete().in('task_id',ids);fail('replace project collaborators',r.error)}
if(XR_TRAINING_DEPENDENCIES.length){r=await c.from('launch_task_dependencies').insert(XR_TRAINING_DEPENDENCIES.map(x=>({task_id:id.get(x.taskKey),depends_on_task_id:id.get(x.dependsOnTaskKey),dependency_type:x.dependencyType})));fail('insert project dependencies',r.error)}
if(XR_TRAINING_COLLABORATORS.length){r=await c.from('launch_task_collaborators').insert(XR_TRAINING_COLLABORATORS.map(x=>({task_id:id.get(x.taskKey),collaborator:x.collaborator})));fail('insert project collaborators',r.error)}
report(await read());
