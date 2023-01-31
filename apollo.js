import { useEffect, useReducer } from "react";

const defineApollo = ({ initial, name, reducer, after }) => {

    return () => {

        const [state, dispatch] = useReducer(reducer, initial)

        useEffect(() => {

            const handler = async ({ detail }) => {
                dispatch(detail)
            }

            window.addEventListener(name, handler)

            return () => {
                window.removeEventListener(name, handler)
            }

        }, [])

        useEffect(() => {
            if (after && state !== initial) {
                after(state);
            }
        }, [state])

        return [state, (value) => {
            dispatchEvent(new CustomEvent(name, {
                detail: value
            }))
        }];

    }

}

export default defineApollo;
