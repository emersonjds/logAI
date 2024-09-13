import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import Modal from "react-modal";

const GraphWithModal = () => {
  const cyRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: document.getElementById("cy"), // Contêiner HTML onde o grafo será renderizado

      elements: [
        // Define nós e arestas do grafo
        { data: { id: "a", label: "API A" } },
        { data: { id: "b", label: "API B" } },
        { data: { id: "c", label: "API C" } },
        { data: { source: "a", target: "b" } },
        { data: { source: "b", target: "c" } },
      ],

      style: [
        // Estilo dos nós e arestas
        {
          selector: "node",
          style: {
            "background-color": "#007bff",
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            color: "#fff",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
          },
        },
      ],

      layout: {
        name: "grid",
        rows: 1,
      },
    });

    // Adiciona evento ao clicar no nó
    cyRef.current.on("tap", "node", (event) => {
      const node = event.target;
      setSelectedNode(node.data("label")); // Define o nó selecionado
      setIsOpen(true); // Abre o modal
    });
  }, []);

  // Funções para abrir e fechar o modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedNode(null);
  };

  return (
    <div>
      <div id="cy" style={{ width: "600px", height: "400px" }}></div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Node Information"
      >
        <h2>Instruções para {selectedNode}</h2>
        <p>Essas são as instruções para a {selectedNode}.</p>
        <button onClick={closeModal}>Fechar</button>
      </Modal>
    </div>
  );
};

export default GraphWithModal;
