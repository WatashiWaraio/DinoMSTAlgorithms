class primAlgorithm {
    constructor(container) {
        this.graph = new Graph();
        this.visualizer = new GraphVisualizer(container);
    }

    addEdge(from, to, weight) {
        this.graph.addEdge(from, to, weight);
    }

    runPrim(startVertex) {
        const mst = this.prim(startVertex);
        this.visualizer.drawGraph(this.graph); 
        this.visualizer.animatePrim(mst); 
        return mst; 
    }

    prim(start) {
        const mst = [];
        const visited = new Set();
        const minHeap = [];

        const addEdges = (vertex) => {
            this.graph.edges.forEach(edge => {
                if ((edge.from === vertex && !visited.has(edge.to)) || 
                    (edge.to === vertex && !visited.has(edge.from))) {
                    minHeap.push(edge);
                }
            });
        };

        visited.add(start);
        addEdges(start);

        while (minHeap.length > 0) {
            minHeap.sort((a, b) => a.weight - b.weight); 
            const edge = minHeap.shift(); 

   
            if (!visited.has(edge.to)) {
                visited.add(edge.to);
                mst.push(edge);
                addEdges(edge.to); 
            }
        }

        return mst;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mynetwork');
    const controller = new primAlgorithm(container);

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
        const weight = Math.floor(Math.random() * 10) ; 
        controller.addEdge(edge.from, edge.to, weight);
    });

    const mst = controller.runPrim('A'); 

    console.log("Árbol de Expansión Mínima:", mst);

    const mstOutput = document.getElementById('mst-outputp');
    mst.forEach(edge => {
        mstOutput.innerHTML += `Desde: ${edge.from}, Hacia: ${edge.to}, Peso: ${edge.weight}<br>`;
    });
});
