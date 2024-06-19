import './App.css';
import React, { useState } from 'react';
var k = 0;

function App() {

  const [treeData, setTreeData] = useState([]);

   const [selectedIndex, setSelectedIndex] = useState(null);

  const select = (index) => {
    if (index !== selectedIndex) setSelectedIndex(index);
    else setSelectedIndex(null);
  }

  function renderNode(node) {
    return (
      <div className='node' key={node.key} id={node.key}>
        <span style = {{backgroundColor:(selectedIndex===node.key.toString())?"blue":"white"}} onClick={() => select(node.key)}>{node.label}</span>
        <input type="text"></input>
        {node.children && node.children.map((childNode) => renderNode(childNode))}
      </div>
    );
  }

  const reset = () => {
    setTreeData([]);
    k = 0;
    setSelectedIndex(null);
  }

  const editInput = (selectedIndex) => {
    if (selectedIndex == null) alert("Выберите элемент");
    else if (document.getElementById('edit').innerHTML !== "OK")
    {
      document.getElementById(selectedIndex).querySelector('span').style.display = 'none';
      document.getElementById(selectedIndex).querySelector('input').style.display = 'block';
      // document.getElementById('edit').innerHTML = "OK";
    }
    else {
      editNode(selectedIndex, document.getElementById(selectedIndex).querySelector('input').value);
      // document.getElementById('edit').innerHTML = "Edit";
      document.getElementById(selectedIndex).querySelector('span').style.display = 'block';
      document.getElementById(selectedIndex).querySelector('input').style.display = 'none';
    }
  }

  const editNodeRec = (node, selectedIndex, newName) => {
    if (node.key === selectedIndex.toString()) {
      return {
        ...node,
        label: newName
      };
    }
    else if (node.children.length > 0)
    {
      return {
        ...node,
        children: node.children.map(child => editNodeRec(child, selectedIndex, newName))
      };
    }
    else
    {
      return node;
    }
  }

  const editNode = (selectedIndex, newName) => {
    if (selectedIndex != null)
    {
      const updatedTreeData = treeData.map(node => {return editNodeRec(node, selectedIndex, newName)
      });
      setTreeData(updatedTreeData);
    }
    else alert("Выберите элемент");
    select(null);
  };

  const addNodeRec = (node, selectedIndex, newNode) => {
    if (node.key === selectedIndex.toString()) {
      return {
        ...node,
        children: [...node.children, newNode]
      };
    }
    else if (node.children.length > 0)
    {
      return {
        ...node,
        children: node.children.map(child => addNodeRec(child, selectedIndex, newNode))
      };
    }
    else
    {
      return node;
    }
  }

  const addNode = (selectedIndex) => {
    const newNode = {
      key: (k+1).toString(),
      label: "Node"+(k+1).toString(),
      children: []
    };

    k += 1;
    if (selectedIndex != null)
    {
      const updatedTreeData = treeData.map(node => {return addNodeRec(node, selectedIndex, newNode)
      });
      setTreeData(updatedTreeData);
    }
    else
    {
      const updatedTreeData = [...treeData, newNode];
      setTreeData(updatedTreeData);
    }
  };

  const removeNode = (selectedIndex) => {
    if (selectedIndex != null)
    {
      const updatedTreeData = treeData.map(node => removeNodeRec(node, selectedIndex)).filter(Boolean);
      setTreeData(updatedTreeData);
    }
    else alert("Выберите элемент");
    select(null);
  };

  function removeNodeRec(node, keyToDelete) {
    if (node.key === keyToDelete) {
      return null;
    }
    const updatedChildren = node.children.map(child => removeNodeRec(child, keyToDelete)).filter(Boolean);
    return {...node, children: updatedChildren };
  }

  return (
    <div className="App" >
      <div className='container text'>
        <div className='section' style={{borderBottom:"3px solid green"}}>
          <header>Tree</header>
        </div>
        <div className='section' id="0" style={{borderBottom:"3px solid green"}}>
          {
            treeData.map((node) => renderNode(node))
          }
        </div>
        <div className='section'>
          <button className='btn text' onClick={() => addNode(selectedIndex)}>Add</button>
          <button className='btn text' onClick={() => removeNode(selectedIndex)}>Remove</button>
          <button id="edit" className='btn text' onClick={() => editInput(selectedIndex)}>Edit</button>
          <button className='btn text' onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
};

export default App;
