import './content.css';

// PLACE ELEMENTS LIKE THIS → <Content><Element /></Content>
export default function Content({ children }) {
  return <div className="content">{children}</div>;
}
