import { useState, useEffect } from 'react';

function getErrorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

export default function useFetch<T>(url: string) {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>('');

	async function fetchData() {
		if (!url) return;

		setIsLoading(true);
		try {
			const response = await fetch(url);
			if (!response.ok) {
				setError(String(response.status));
				return;
			}
			const data = (await response.json()) as T;
			setData(data);
		} catch (err) {
			console.error(err);
			setError(getErrorMessage(err));
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		void fetchData();
	}, [url]);

	return { data, isLoading, error };
}
