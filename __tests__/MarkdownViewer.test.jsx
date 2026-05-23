import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarkdownViewer from '@/components/MarkdownViewer';

// Mock html2pdf.js builder pattern chain
const mockSave = vi.fn().mockReturnThis();
const mockFrom = vi.fn().mockReturnThis();
const mockSet = vi.fn().mockReturnThis();
const mockHtml2pdf = vi.fn(() => ({
  set: mockSet,
  from: mockFrom,
  save: mockSave,
}));

vi.mock('html2pdf.js', () => ({
  default: mockHtml2pdf,
}));

describe('MarkdownViewer Component & Interaction Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the MarkdownViewer, click Save, and call html2pdf on the wordpad-content node', async () => {
    // Arrange
    // Mock the global fetch to return a simple markdown document
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve('# Mock WordPad Title\n\nThis is a mock description.'),
      })
    );

    // Act
    render(<MarkdownViewer windowId="test-doc" />);

    // Wait for the loader to finish and the markdown to render
    const titleElement = await screen.findByText('Mock WordPad Title');
    expect(titleElement).toBeInTheDocument();

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Assert
    await waitFor(() => {
      expect(mockHtml2pdf).toHaveBeenCalledTimes(1);
    });

    const expectedElement = document.querySelector('.wordpad-content');
    expect(expectedElement).toBeInTheDocument();
    expect(mockFrom).toHaveBeenCalledWith(expectedElement);
    expect(mockSave).toHaveBeenCalledTimes(1);
  });

  it('should correctly render KaTeX equations and author blocks for the ML Neuro Review paper before PDF export', async () => {
    // Arrange
    // Mock fetch to return the content of the Multimodal ML Neuro Review paper
    const paperMarkdown = `
# Multimodal ML in Neurology: A Review

Co-authored with Vidit Pant and P Tarun.

## Fusion Paradigms and Loss Formulations

For intermediate fusion, the contrastive loss between EEG embedding $z_{e}$ and MRI embedding $z_{m}$ is:

$$\\mathcal{L}_{contrast} = -\\sum_{i=1}^{N} \\log \\frac{\\exp(\\text{sim}(z_{e,i}, z_{m,i}) / \\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(z_{e,i}, z_{m,j}) / \\tau)}$$

Where:
- $\\tau$ is a temperature parameter.
    `;

    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(paperMarkdown),
      })
    );

    // Act
    const { container } = render(<MarkdownViewer windowId="ml-neuro-review" />);

    // Wait for title and contents to render
    const paperTitle = await screen.findByText('Multimodal ML in Neurology: A Review');
    expect(paperTitle).toBeInTheDocument();

    // Assert the author block is rendered
    expect(screen.getByText(/Vidit Pant/)).toBeInTheDocument();
    expect(screen.getByText(/P Tarun/)).toBeInTheDocument();

    // Assert that the react-markdown rehype-katex plugin correctly rendered the KaTeX formulas in the DOM
    const katexMathElements = container.querySelectorAll('.katex');
    expect(katexMathElements.length).toBeGreaterThan(0);

    // Click Save to trigger PDF generation
    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    // Assert that pdf exporter still functions
    await waitFor(() => {
      expect(mockHtml2pdf).toHaveBeenCalledTimes(1);
    });
    const expectedElement = container.querySelector('.wordpad-content');
    expect(mockFrom).toHaveBeenCalledWith(expectedElement);
  });
});
