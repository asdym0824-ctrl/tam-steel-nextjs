import test from 'node:test';
import assert from 'node:assert/strict';
import { sameOrigin, isAdmin } from '../src/lib/security';
test('same origin supports external Host behind Next internal URL', () => {
 assert.equal(sameOrigin(new Request('http://localhost:3000/api/submissions/quotes',{headers:{host:'steel.example',origin:'https://steel.example'}})),true);
 assert.equal(sameOrigin(new Request('http://localhost:3000/api/submissions/quotes',{headers:{host:'steel.example',origin:'https://attacker.example'}})),false);
 assert.equal(sameOrigin(new Request('http://localhost:3000/api/submissions/quotes',{headers:{host:'steel.example',origin:'null'}})),false);
});
test('admin is denied without configured strong token',()=>{
 const old=process.env.ADMIN_TOKEN;
 try { delete process.env.ADMIN_TOKEN; assert.equal(isAdmin(new Request('http://localhost')),false); process.env.ADMIN_TOKEN='short'; assert.equal(isAdmin(new Request('http://localhost',{headers:{authorization:'Bearer short'}})),false); }
 finally {if(old===undefined) delete process.env.ADMIN_TOKEN;else process.env.ADMIN_TOKEN=old;}
});
