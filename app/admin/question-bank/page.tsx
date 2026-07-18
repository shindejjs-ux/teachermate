"use client";

import { useEffect, useMemo, useState } from "react";

import SearchBar from "@/components/question-bank/SearchBar";
import FilterBar from "@/components/question-bank/FilterBar";
import QuestionTable from "@/components/question-bank/QuestionTable";
import StatsCards from "@/components/question-bank/StatsCards";
import Toolbar from "@/components/question-bank/Toolbar";
import AddQuestionModal from "@/components/question-bank/AddQuestionModal";
import EditQuestionModal from "@/components/question-bank/EditQuestionModal";

export type Question = {
  id: number;
  question: string;
  marks: number;
  difficulty: string;
  question_type: string;
  blooms_level: string;
  competency: boolean;
};

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<Question | null>(null);

  // Future Supabase Data
  const [classes] = useState<any[]>([]);
  const [subjects] = useState<any[]>([]);
  const [books] = useState<any[]>([]);
  const [chapters] = useState<any[]>([]);

  const loadQuestions = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/question-bank");

      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }

      const data = await response.json();

      if (data?.success && Array.isArray(data.questions)) {
        setQuestions(data.questions);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error("Question Bank Error:", error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch = q.question
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "" || q.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [questions, search, difficulty]);

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          📚 Question Bank
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all questions for TeacherMate
        </p>
      </div>

      {/* Toolbar */}
      <Toolbar
        onAdd={() => setOpenModal(true)}
        onImport={() => alert("Excel Import coming soon")}
        onExport={() => alert("Excel Export coming soon")}
      />

      {/* Stats */}
      <StatsCards
        total={questions.length}
        mcq={
          questions.filter((q) => q.question_type === "MCQ").length
        }
        competency={
          questions.filter((q) => q.competency).length
        }
        hots={
          questions.filter((q) => q.blooms_level === "Create").length
        }
      />

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {/* Filters */}
      <FilterBar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />

      {/* Table */}
      {loading ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          Loading Questions...
        </div>
      ) : (
        <QuestionTable
          questions={filteredQuestions}
          onEdit={(question: Question) => {
            setSelectedQuestion(question);
            setEditOpen(true);
          }}
          onDelete={(id: number) => {
            setQuestions((prev) =>
              prev.filter((q) => q.id !== id)
            );
          }}
        />
      )}

      {/* Add Modal */}
      <AddQuestionModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSaved={loadQuestions}
      />

      {/* Edit Modal */}
      <EditQuestionModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedQuestion(null);
        }}
        onSaved={loadQuestions}
        question={selectedQuestion}
        classes={classes}
        subjects={subjects}
        books={books}
        chapters={chapters}
      />
    </div>
  );
}