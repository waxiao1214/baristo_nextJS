import { useEffect, useState } from 'react';

const useBaseToggleLoader = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoader = () => {
        setIsLoading(isLoading);
    }

    return {
        isLoading,
        toggleLoader
    }
}

export default useBaseToggleLoader;