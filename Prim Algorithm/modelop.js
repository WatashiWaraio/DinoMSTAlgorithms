class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
  }
  
  class Graph {
    constructor() {
        this.vertices = new Set(); 
        this.edges = []; 
    }

    addVertex(vertex) {
        this.vertices.add(vertex);
    }

    addEdge(from, to, weight) {
        this.edges.push(new Edge(from, to, weight));
        this.addVertex(from);
        this.addVertex(to);
    }
}
