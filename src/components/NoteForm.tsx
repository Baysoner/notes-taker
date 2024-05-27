import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import CreatableReactSelect from "react-select/creatable";
import { NoteData, Tag } from "../App";

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  avaliableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, avaliableTags }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      textarea: textareaRef.current!.value,
      tags: [],
    });

    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control ref={titleRef} required></Form.Control>
        </Form.Group>
        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <CreatableReactSelect
            onCreateOption={(label) => {
              const newTag = { id: uuidV4(), label };
              onAddTag(newTag);
              setSelectedTags((prev) => [...prev, newTag]);
            }}
            value={selectedTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            options={avaliableTags.map((tag) => {
              return { label: tag.label, value: tag.id };
            })}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((tag) => {
                  return { label: tag.label, id: tag.value };
                })
              );
            }}
            isMulti
          />
        </Form.Group>
        <Form.Group controlId="textarea">
          <Form.Label>Body</Form.Label>
          <Form.Control ref={textareaRef} required as="textarea" rows={10} />
        </Form.Group>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-center"
        >
          <button type="submit" className="btn btn-dark">
            Save
          </button>
          <Link to="..">
            <button type="button" className="btn btn-outline-secondary">
              Cancel
            </button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
}
