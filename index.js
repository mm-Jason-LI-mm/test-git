const fs = require("fs");
const path = require("path");

function getTree(dir, indent = "") {
    let tree = "";
    // Read all items in directory with their type information.
    const items = fs.readdirSync(dir, { withFileTypes: true })
        .filter(item => {
            // Filter out the "node_modules" folder.
            if (item.name === "node_modules") return false;
            // Also filter out directories that start with ".".
            if (item.isDirectory() && item.name.startsWith(".")) return false;
            return true;
        });

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        tree += indent + (isLast ? "└── " : "├── ") + item.name + "\n";
        if (item.isDirectory()) {
            const newIndent = indent + (isLast ? "    " : "│   ");
            // Recursively add the directory tree.
            tree += getTree(path.join(dir, item.name), newIndent);
        }
    });
    return tree;
}

// Start from the current working directory (the project root)
const treeStructure = getTree(process.cwd());

// Option 1: Print to the console
console.log(treeStructure);

// Option 2: Save to a text file named "project-tree.txt"
fs.writeFileSync("project-tree.txt", treeStructure);

console.log("Tree successfully written to project-tree.txt");
