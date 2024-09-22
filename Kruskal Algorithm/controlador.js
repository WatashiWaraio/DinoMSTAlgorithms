class DisjointSet {
    constructor(vertices) {
        this.parent = {};
        vertices.forEach(v => this.parent[v] = v);
    }
  
    find(item) {
        if (this.parent[item] === item) return item;
        return this.find(this.parent[item]);
    }
  
    union(set1, set2) {
        const root1 = this.find(set1);
        const root2 = this.find(set2);
        this.parent[root1] = root2;
    }
}
  
class KruskalAlgorithm {
    constructor(graph) {
        this.graph = graph;
    }
  
    run() {
        const edges = [...this.graph.edges].sort((a, b) => a.weight - b.weight);
        const result = [];
        const ds = new DisjointSet(this.graph.vertices);
  
        for (let edge of edges) {
            if (ds.find(edge.from) !== ds.find(edge.to)) {
                result.push(edge);
                ds.union(edge.from, edge.to);
            }
        }
  
        return result;
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const graph = new Graph();
    const edges = [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'D' },
        { from: 'C', to: 'E' },
        { from: 'D', to: 'E' },
        { from: 'D', to: 'F' },
        { from: 'E', to: 'F' }
    ];

    edges.forEach(edge => {
        const weight = Math.floor(Math.random() * 10);
        graph.addEdge(edge.from, edge.to, weight);
    });

    const kruskal = new KruskalAlgorithm(graph);
    const mst = kruskal.run();

    const visualizer = new GraphVisualizer(document.getElementById('mynetwork'));
    visualizer.drawGraph(graph, mst);

    console.log("Árbol de Expansión Mínima:", mst);

    const mstOutput = document.getElementById('mst-output');
    mst.forEach(edge => {
        mstOutput.innerHTML += `Desde: ${edge.from}, Hacia: ${edge.to}, Peso: ${edge.weight}<br>`;
    });
});
