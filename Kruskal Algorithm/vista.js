class GraphVisualizer {
    constructor(container) {
        this.container = container;
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        this.network = null;
    }

    drawGraph(graph, mst = []) {
        this.nodes.clear();
        this.edges.clear();

        graph.vertices.forEach(v => {
            this.nodes.add({ id: v, label: v.toString() });
        });

        graph.edges.forEach(e => {
            const isMST = mst.some(m => m.from === e.from && m.to === e.to);
            this.edges.add({
                from: e.from,
                to: e.to,
                label: e.weight.toString(),
                color: isMST ? { color: '#ff0000', highlight: '#ff0000' } : { color: '#848484', highlight: '#848484' },
                width: isMST ? 3 : 1
            });
        });

        const data = { nodes: this.nodes, edges: this.edges };
        const options = {
            physics: false,
            edges: {
                font: { align: 'middle' }
            }
        };

        this.network = new vis.Network(this.container, data, options);
    }
}
