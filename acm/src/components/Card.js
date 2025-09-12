import './Card.css';
export default function Card(props) {
  return (
    <div className="card" key={props.Id}>
      <h2 className="Title">{props.title}</h2>
      <p className="User">User: {props.userId}</p>
      <p className="Body">{props.body}</p>
    </div>
  );
}