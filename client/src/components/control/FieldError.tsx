const FieldError = ({ text }: { text: string }) => {
    return (
        <div className="field-error" style={{ whiteSpace: "pre-wrap" }}>{ text }</div>
    )
}

export default FieldError