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
          // { data: { id: "a", label: "API A" } },
          // { data: { id: "b", label: "API B" } },
          // { data: { id: "c", label: "API C" } },
          // { data: { source: "b", target: "a" } },
          // { data: { source: "c", target: "a" } },

          // Nó D e suas conexões, com o nó G em estado de erro
          // { data: { id: "d", label: "API D" } },
          // { data: { id: "e", label: "API E" } },
          // { data: { id: "f", label: "API F", error: true } },
          // { data: { id: "g", label: "API G", error: true } }, // Nó com erro
          // { data: { id: "h", label: "API H" } },
          // { data: { source: "e", target: "d" } },
          // { data: { source: "f", target: "d" } },
          // { data: { source: "g", target: "d" } },
          // { data: { source: "h", target: "d" } },

          { data: { id: "i", label: "Aprovador" } },
          { data: { id: "j", label: "PortoNet", error: true } },
          { data: { id: "k", label: "Senior Sistemas", error: true } },
          { data: { id: "l", label: "SSO" } }, // Nó com erro
          { data: { id: "m", label: "Agendamento Quadra" } },
          { data: { id: "n", label: "Ecommerce" } },
          { data: { id: "o", label: "Porto Bank" } },
          { data: { id: "p", label: "BD A", error: true } },
          { data: { id: "q", label: "BD B" } },
          { data: { source: "i", target: "j" } },
          { data: { source: "k", target: "j" } },
          { data: { source: "l", target: "j" } },
          { data: { source: "m", target: "j" } },
          { data: { source: "n", target: "j" } },
          { data: { source: "o", target: "j" } },
          { data: { source: "p", target: "k" } },
          { data: { source: "q", target: "k" } },
          // { data: { id: "p", label: "SSO" } },
        ],

        style: [
          // Estilo dos nós
          {
            selector: "node",
            style: {
              "background-color": "#6ebd4f",
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
        <Breadcrumb pageName="Analise de API's em tempo real" />
        <div className="radius w-2/3 w-60 border p-4">
          <h1>Status</h1>
          <p>
            PortoNet: <span className="text-red-500">Erro</span>
          </p>
          <p>
            Senior Sistemas: <span className="text-red-500">Erro</span>
          </p>
          <p>
            SSO: <span className="text-green-500">Ok</span>
          </p>
        </div>

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
              height: "300px",
            },
          }}
        >
          <h2>Instruções para {selectedNode}</h2>
          <br />
          {selectedNode === "Senior Sistemas" || "SSO" ? (
            <p className="text-xl3 bold text-black">
              O nó {selectedNode} está apresentando problemas! Nosso agente
              identificou que existe uma falha no Banco de Dados A que é a causa
              raiz
            </p>
          ) : (
            <p>Essas são as instruções para a {selectedNode}.</p>
          )}
          <br />
          <br />
          <button onClick={closeModal} className="border p-4">
            Fechar
          </button>
        </Modal>
      </div>
    </DefaultLayout>
  );
};

export default GraphWithModal;
