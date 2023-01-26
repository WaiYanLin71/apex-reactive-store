import { useEffect, useState } from "react";

const createStore = ({ initial, name, reducers }) => {

    const config = {
        initial,
        actions: Object.fromEntries(Object.entries(reducers).map(([key, value]) => {
            return [key, (payload = undefined) => {
                return [payload, reducers[key]];
            }]
        }),),

        defineApexStore: () => {

            const [state, setState] = useState(config.initial)

            useEffect(() => {

                const handler = async ({ detail }) => {
                    setState(() => detail)
                }

                window.addEventListener(`apex:${name}`, handler)

                return () => {
                    window.removeEventListener(`apex:${name}`, handler)
                }

            }, [])

            return [state, ([payload, reducer]) => {
                reducer(config.initial, payload)
                dispatchEvent(new CustomEvent(`apex:${name}`, {
                    detail: structuredClone(config.initial)
                }))
            }]
        }
    }

    return { defineApexStore: config.defineApexStore, actions: config.actions }

}

export default createStore;
