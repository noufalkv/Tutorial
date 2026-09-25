import './Pages.css';
import './BoxSizingDemo.css';

function React() {
  return (
    <div className="page">
      <h1>React</h1>
      <p>Welcome to the React page. Add your content here.</p>

      <div className="simple-demo">
        <h2>Box-Sizing Example</h2>

        <div className="example">
          <h3>content-box (Default)</h3>
          <div className="box-default">100px + padding</div>
          <p>Set: width: 100px; padding: 20px;</p>
          <p>Actual size: 140px</p>
        </div>

        <div className="example">
          <h3>border-box (Better)</h3>
          <div className="box-border">100px total</div>
          <p>Set: width: 100px; padding: 20px; box-sizing: border-box;</p>
          <p>Actual size: 100px</p>
        </div>
      </div>
    </div>
  );
}

export default React;
