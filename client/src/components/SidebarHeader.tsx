interface SidebarHeaderProps {
    title: string,
    open: boolean,
    setOpen: (arg0: boolean) => void
}

export default function SidebarHeader({ title, open, setOpen }: SidebarHeaderProps) {

    const toggle = () => {
        const newStatus = open ? false : true
        setOpen(newStatus)
    }

    return (
        <button className={`small-button wide-button menu${open && ' shiny'}`} onClick={toggle}>
            {title.toUpperCase()}
        </button>
    )
}