import {
    forwardRef,
    TextareaHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
} from 'react';

export default forwardRef(function TextArea(
    {
        className = '',
        isFocused = false,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref,
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    const resize = () => {
        const el = localRef.current;
        if (el) {
            el.style.height = 'auto';
            el.style.height = `${el.scrollHeight + 1}px`;
        }
    };

    useEffect(resize, []);

    return (
        <textarea
            {...props}
            className={
                'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ' +
                className
            }
            ref={localRef}
            onInput={(e) => {
                resize();
                props.onInput?.(e);
            }}
        />
    );
});
