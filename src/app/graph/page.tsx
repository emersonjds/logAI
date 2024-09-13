"use client";

import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import Modal from "react-modal";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const GraphWithModal = () => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    cyRef.current = cytoscape({
      container: document.getElementById("cy"), // Contêiner HTML onde o grafo será renderizado

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

      //   style: [
      //     // Estilo dos nós e arestas
      //     {
      //       selector: "node",
      //       style: {
      //         "background-color": "#007bff",
      //         label: "data(label)",
      //         "text-valign": "center",
      //         "text-halign": "center",
      //         color: "#fff",
      //         width: 80,
      //         height: 80,
      //       },
      //     },
      //     {
      //       selector: "edge",
      //       style: {
      //         width: 2,
      //         "line-color": "#ccc",
      //         "target-arrow-color": "#ccc",
      //         "target-arrow-shape": "triangle",
      //       },
      //     },
      //   ],

      //   layout: {
      //     name: "grid",
      //     rows: 1,
      //   },
      // });

      style: [
        // Estilo dos nós
        {
          selector: "node",
          style: {
            "background-color": "#007bff",
            label: "data(label)",
            "text-valign": "center",
            "text-halign": "center",
            color: "#fff",
            height: 80,
            width: 80,
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
            color: "#fff",
            height: 80,
            width: 80,
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
    <>
      <DefaultLayout>
        <div className="mx-auto max-w-242.5">
          <Breadcrumb pageName="Graph" />

          <div>
            <div id="cy" className="mx-auto flex flex-1 bg-orange-500"></div>

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
        </div>
      </DefaultLayout>
    </>
  );
};

export default GraphWithModal;
