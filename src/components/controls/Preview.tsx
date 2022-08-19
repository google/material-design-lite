import type { FunctionalComponent } from 'preact';
import { setThemeColor } from "./Color";

const ColorPreview: FunctionalComponent<{ color: string }> = ({ color = '' }) => {
    return (
        <>
            <div style={{
                background: color,
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                border: '1px solid black',
                cursor: 'pointer',
            }}
                onClick={() => setThemeColor(color)}
            >
            </div>
        </>
    );
};

export default ColorPreview;