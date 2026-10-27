import test from 'node:test';
import assert from 'node:assert/strict';
import { schemas } from '../src/lib/validation';
test('normalizes Persian phone digits and validates required quote fields',()=>{
 const result=schemas.quotes.parse({name:'مشتری تست',phone:'۰۹۱۲۳۴۵۶۷۸۹'});
 assert.equal(result.phone,'09123456789');
 assert.equal(schemas.quotes.safeParse({name:'',phone:'invalid'}).success,false);
});
test('rejects invalid partnership role and email',()=>{
 assert.equal(schemas.partnerships.safeParse({fullName:'Test',phone:'09123456789',role:'admin'}).success,false);
 assert.equal(schemas.partnerships.safeParse({fullName:'Test',phone:'09123456789',role:'supplier',email:'broken'}).success,false);
});
test('contract requires consent, signature and positive tonnage',()=>{
 const valid={clientName:'Test company',nationalId:'۱۴۰۰۸۹۲۳۴۱۱',serviceType:'galvanized',tonnage:'۲۵',deliveryLocation:'Tehran',agreedTerms:true,signature:'data:image/png;base64,aGVsbG8='};
 assert.equal(schemas.contracts.safeParse(valid).success,true);
 for(const overrides of [{agreedTerms:false},{signature:''},{tonnage:'-1'},{nationalId:'abc'}]) assert.equal(schemas.contracts.safeParse({...valid,...overrides}).success,false);
});
