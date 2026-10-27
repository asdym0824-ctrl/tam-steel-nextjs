export async function submitRequest(kind: string, payload: unknown) {
 const response = await fetch(`/api/submissions/${kind}`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload)});
 const result = await response.json();
 if (!response.ok) throw new Error(result.error || 'ثبت درخواست ناموفق بود.');
 return result as { trackingCode: string; createdAt: string };
}
