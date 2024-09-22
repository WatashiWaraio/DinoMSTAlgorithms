class GraphVisualizer {
    constructor(container) {
        this.container = container;
        this.nodes = new vis.DataSet();
        this.edges = new vis.DataSet();
        this.network = null;
    }

    drawGraph(graph) {
        this.nodes.clear();
        this.edges.clear();

        graph.vertices.forEach(v => {
            this.nodes.add({ id: v, label: v.toString(), color: { background: '#97C2FC' } }); 
        });

        graph.edges.forEach(e => {
            this.edges.add({
                id: `${e.from}-${e.to}`, 
                from: e.from,
                to: e.to,
                label: e.weight.toString(),
                color: { color: '#848484', highlight: '#848484' }, 
                width: 1
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

    animatePrim(mst) {
        let currentEdgeIndex = 0;
    
        const animateNextEdge = () => {
            if (currentEdgeIndex < mst.length) {
                const edge = mst[currentEdgeIndex];
                const edgeId = `${edge.from}-${edge.to}`;
    
                console.log(`Actualizando arista: ${edgeId}`); 
    
                this.edges.update({
                    id: edgeId,
                    color: { color: '#ff0000', highlight: '#ff0000' }, 
                    width: 3 
                });
    
            
                this.nodes.update({ 
                    id: edge.from, 
                    color: { background: '#ff0000', border: '#ff0000' } 
                });
                this.nodes.update({ 
                    id: edge.to, 
                    color: { background: '#ff0000', border: '#ff0000' } 
                });
    
                currentEdgeIndex++;
    
                setTimeout(animateNextEdge, 1500); 
            }
        };
    
        animateNextEdge();
    } 
}

