import React, { useState } from "react";
import "./App.css";

const files = {
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "@adobe",
        },
        {
          name: "axios",
        },
        {
          name: "@eslint",
          children: [
            {
              name: "eslintrc",
              children: [
                {
                  name: "src",
                  children: [
                    {
                      name: "eslintrcpackage.json",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "rootpackage.json" },
    { name: "src", children: [{ name: "App.css" }, { name: "App.tsx" }] },
  ],
};

type File = {
  name: string;
  children?: any;
};

type FileComponentProps = {
  file: File;
  level: number;
};

const FileComponent = ({ file, level }: FileComponentProps) => {
  const [displayChildren, setDisplayChildren] = useState(false);

  const padding = level > 0 ? 16 : 0;

  if (file.children) {
    return (
      <div style={{ paddingLeft: padding }}>
        <button
          onClick={() => {
            setDisplayChildren((oldState) => !oldState);
          }}
        >
          {displayChildren ? "-" : "+"} {file.name}
        </button>

        {displayChildren &&
          file.children.map((childrenFile: any) => (
            <FileComponent file={childrenFile} level={level + 1} />
          ))}
      </div>
    );
  }

  return (
    <p style={{ paddingLeft: padding }} key={file.name}>
      {file.name}
    </p>
  );
};

function App() {
  const tree = files.children.map((file) => <FileComponent file={file} level={0} />);

  return <div className="App">{tree}</div>;
}

export default App;
