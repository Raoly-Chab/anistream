import { useState, useEffect } from "react";

export function useApi(asyncFn, params = [], auto = true) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const execute = async (...args) => {
		setLoading(true);
		setError(null);
		try {
			const result = await asyncFn(...args);
			setData(result);
			return result;
		} catch (e) {
			setError(e);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (auto) execute(...params);
		// eslint-disable-next-line
	}, params);

	return { data, loading, error, execute };
}
