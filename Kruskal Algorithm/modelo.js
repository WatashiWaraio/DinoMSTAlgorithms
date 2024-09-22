class Edge {
  constructor(from, to, weight) {
      this.from = from;
      this.to = to;
      this.weight = weight;
  }
}

class Graph {
  constructor() {
      this.edges = [];
      this.vertices = new Set();
  }

  addEdge(from, to, weight) {
      this.edges.push(new Edge(from, to, weight));
      this.vertices.add(from);
      this.vertices.add(to);
  }
}
