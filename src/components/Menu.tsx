import type { FunctionalComponent } from 'preact';

interface MenuItem {
    text: string;
    header?: boolean;
    draft?: boolean;
    link?: string;
}

const Menu: FunctionalComponent<{ items: MenuItem[] }> = ({ items = [] }) => {
    return (
        <>
            <nav class="menu">
                {
                    items.map((item) => {
                        if (item.header) {
                            return <h2>{item.text}</h2>;
                        }
                        if (!item.draft) {
                            return <a class="link" href={`/material-design-lite/${item.link}`}>{item.text}</a>;
                        } else {
                            return <div class="link draft">{item.text}</div>;
                        }
                    })
                }
            </nav>
        </>
    );
}; export default Menu;
