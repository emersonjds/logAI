"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import Modal from "react-modal";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const GraphWithModal = () => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  useLayoutEffect(() => {
    if (typeof window !== "undefined" && cyRef.current === null) {
      cyRef.current = cytoscape({
        container: document.getElementById("cy"), // O contêiner HTML onde o grafo será renderizado

        elements: [
          // Nó A e suas conexões
          { data: { id: "a", label: "API A" } },
          { data: { id: "b", label: "API B" } },
          { data: { id: "c", label: "API C" } },
          { data: { source: "b", target: "a" } },
          { data: { source: "c", target: "a" } },

          // Nó D e suas conexões, com o nó G em estado de erro
          { data: { id: "d", label: "API D" } },
          { data: { id: "e", label: "API E" } },
          { data: { id: "f", label: "API F" } },
          { data: { id: "g", label: "API G", error: true } }, // Nó com erro
          { data: { id: "h", label: "API H" } },
          { data: { source: "e", target: "d" } },
          { data: { source: "f", target: "d" } },
          { data: { source: "g", target: "d" } },
          { data: { source: "h", target: "d" } },
        ],

        style: [
          // Estilo dos nós
          {
            selector: "node",
            style: {
              "background-color": "#007bff",
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#000",
              width: 100,
              height: 100,
            },
          },
          // Estilo do nó com erro
          {
            selector: "node[error]",
            style: {
              "background-color": "#ef4444", // Fundo vermelho para o nó com erro
              label: "data(label)",
              "text-valign": "center",
              "text-halign": "center",
              color: "#000",
              width: 100,
              height: 100,
            },
          },
          // Estilo das arestas
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
          rows: 2,
        },
      });
    }

    // Adiciona evento ao clicar no nó
    if (cyRef.current) {
      cyRef.current.on("tap", "node", (event) => {
        const node = event.target;
        // Rest of the code
        setSelectedNode(node.data("label")); // Define o nó selecionado
        setIsOpen(true); // Abre o modal
      });
    }
  }, []);

  // Funções para abrir e fechar o modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedNode(null);
  };

  return (
    <DefaultLayout>
      <div className="mx-auto flex flex-1 flex-col">
        <Breadcrumb pageName="Api Graphs" />
        <div id="cy" style={{ width: "100%", height: "800px" }}></div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Node Information"
          style={{
            overlay: {
              position: "absolute",
              top: 500,
              left: 500,
              right: 300,
              bottom: 300,
              backgroundColor: "",
            },
            content: {
              position: "fixed",
              top: "100px",
              left: "400px",
              right: "40px",
              bottom: "40px",

              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
              width: "400px",
              height: "400px",
            },
          }}
        >
          <h2>Instruções para {selectedNode}</h2>
          {selectedNode === "API G" ? (
            <p>O nó {selectedNode} está apresentando problemas!</p>
          ) : (
            <p>Essas são as instruções para a {selectedNode}.</p>
          )}
          <button onClick={closeModal}>Fechar</button>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default GraphWithModal;
