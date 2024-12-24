import { useRouter } from 'next/navigation';

/**
 * Set error messages
 */
export const setErrorMessages = (
    response: Record<string, string>,
    setError: (value: React.SetStateAction<string[]>) => void,
): void => {
    for (const key of Object.keys(response)) {
        setError((prev) => [...prev, response[key]]);
    }
};

// /**
//  * Close Modal
//  * @param setModal - setState
//  * @param redirect - Redirect url
//  */
// export const closeModal = <T>(
//     setModal: (value: React.SetStateAction<boolean>) => void,
//     redirect: void,
// ) => {
//     console.log('close close close close close');
//     setModal((prev) => (prev = false));
//     console.log(redirect);
//     if (redirect) {
//         redirect;
//     }
// };

/**
 * Open Modal
 * @param setModal - setState
 */
export const openModal = (
    setModal: (value: React.SetStateAction<boolean>) => void,
) => {
    setModal((prev) => (prev = true));
};
