import { useEffect, useState } from 'react';

const useBaseToggleLoader = () => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLoader = () => {
        console.log('toggle', isLoading);
        setIsLoading(!isLoading);
    }

    return [isLoading,
        toggleLoader]
}

export default useBaseToggleLoader;