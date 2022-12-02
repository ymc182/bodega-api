export function viewQueryCreator(contractId, methodName, argsJson) {
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			jsonrpc: "2.0",
			id: "dontcare",
			method: "query",
			params: {
				request_type: "call_function",
				account_id: contractId,
				method_name: methodName,
				args_base64: Buffer.from(JSON.stringify(argsJson)).toString("base64"),
				finality: "optimistic",
			},
		}),
	};
}

export function parseResult(result) {
	return JSON.parse(Buffer.from(result.result.result).toString());
}
