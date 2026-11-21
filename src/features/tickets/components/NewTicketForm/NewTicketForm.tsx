"use client";

import { useCategories } from "@/entities/ticket/category/useCategories";
import { useCreateTicket } from "@/entities/ticket/useTickets";
import { useAuth } from "@/shared/contexts/session.context";
import { Form } from "@/shared/components/Form";
import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import * as styles from "./new-ticket-form.css";

export function NewTicketForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: categories = [], isLoading, isError } = useCategories();
  const createTicket = useCreateTicket();
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;

    try {
      const ticket = await createTicket.mutateAsync({
        title,
        description,
        categoryId,
        requesterId: user.id,
      });
      router.push(`/tickets/${ticket.id}`);
    } catch (error) {
      console.error("Erro ao abrir chamado", error);
    }
  };

  return (
    <section className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        <ArrowLeft size={16} />
        Voltar para meus chamados
      </Link>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.intro}>
          <h2 className={styles.heading}>Conte como podemos ajudar</h2>
          <p className={styles.description}>
            Descreva sua solicitação e nossa equipe entrará em contato por aqui.
          </p>
        </div>

        <div className={styles.fields}>
          <div className={styles.field}>
            <Form.Label htmlFor="ticket-title">Assunto</Form.Label>
            <Form.Input
              id="ticket-title"
              maxLength={120}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ex.: Não consigo acessar meu e-mail"
              required
              value={title}
            />
          </div>

          <div className={styles.field}>
            <Form.Label htmlFor="ticket-category">Categoria</Form.Label>
            <Form.Select
              id="ticket-category"
              onChange={(event) => setCategoryId(event.target.value)}
              required
              value={categoryId}
              disabled={isLoading || isError}
            >
              <option value="">
                {isLoading ? "Carregando categorias..." : "Selecione uma categoria"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nome}
                </option>
              ))}
            </Form.Select>
          </div>

          <div className={styles.field}>
            <Form.Label htmlFor="ticket-description">Descrição</Form.Label>
            <Form.Textarea
              id="ticket-description"
              maxLength={3000}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Inclua os detalhes, mensagens de erro e o que você já tentou fazer."
              required
              value={description}
            />
            <span className={styles.counter}>{description.length}/3000</span>
          </div>
        </div>

        {isError && (
          <p className={styles.error} role="alert">
            Não foi possível carregar as categorias. Atualize a página e tente
            novamente.
          </p>
        )}
        {createTicket.isError && (
          <p className={styles.error} role="alert">
            Não foi possível abrir o chamado. Verifique os dados e tente
            novamente.
          </p>
        )}

        <div className={styles.actions}>
          <button
            className={`${btnPrimary} ${styles.submitButton}`}
            disabled={
              createTicket.isPending || isLoading || isError || !categoryId
            }
            type="submit"
          >
            <Send size={16} />
            {createTicket.isPending ? "Enviando..." : "Abrir chamado"}
          </button>
        </div>
      </form>
    </section>
  );
}
