export default function MenuBar() {
    return (
        <nav className="menu-bar">
            <ul>
                <li>
                    <a href="#">File</a>
                    <ul>
                        <li><a href="#">New Configuration</a></li>
                        <li><a href="#">Open Configuration</a></li>
                        <li><a href="#">Save Configuration</a></li>
                        <li><a href="#">Quit</a></li>
                    </ul>
                </li>
                <li>
                    <a href="#">View</a>
                    <ul>
                        <li><a href="#">Configuration View</a></li>
                        <li><a href="#">Image View</a></li>
                        <li><a href="#">Point Cloud View</a></li>
                        <li><a href="#">Logs View</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}