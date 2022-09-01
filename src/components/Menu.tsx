import type { FunctionalComponent } from "preact";

interface NavItem {
    text: string;
    header?: boolean;
    children: MenuItem[];
}

interface MenuItem {
    text: string;
    draft?: boolean;
    link?: string;
}

const Menu: FunctionalComponent<{ items: NavItem[] }> = ({ items = [] }) => {
    return (
        <nav class="menu">
            {items.map((item) => {
                return (
                    <>
                        <h2>{item.text}</h2>
                        {item.children.map((child) => {
                            if (child.draft) {
                                return (
                                    <a
                                        class="link"
                                        href={`/material-design-lite/${child.link}`}
                                        style={{
                                            display: "block",
                                        }}
                                    >
                                        {child.text}
                                    </a>
                                );
                            }
                            return (
                                <div
                                    class="link draft"
                                    style={{
                                        display: "block",
                                    }}
                                >
                                    {child.text}
                                </div>
                            );
                        })}
                    </>
                );
            })}
        </nav>
    );
};
export default Menu;
