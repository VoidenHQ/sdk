import { describe, it, expect } from 'vitest';
import { prettifyJSONC, stripComments } from './jsonc';

describe('JSONC Utilities', () => {
  describe('prettifyJSONC', () => {
    it('should format JSONC string with proper indentation', () => {
      const input = '{"name":"test","value":123}';
      const output = prettifyJSONC(input);

      expect(output).toContain('{\n');
      expect(output).toContain('  "name"');
      expect(output).toContain('  "value"');
    });

    it('should handle JSONC with comments', () => {
      const input = '{"name":"test",/* comment */"value":123}';
      const output = prettifyJSONC(input);

      // Should preserve comments while formatting
      expect(output).toContain('/* comment */');
    });

    it('should handle nested objects', () => {
      const input = '{"outer":{"inner":"value"}}';
      const output = prettifyJSONC(input);

      expect(output).toContain('{\n');
      expect(output).toContain('  "outer"');
      expect(output).toContain('    "inner"');
    });

    it('should handle arrays', () => {
      const input = '{"items":[1,2,3]}';
      const output = prettifyJSONC(input);

      expect(output).toContain('[\n');
      expect(output).toContain('  ]');
    });

    it('should handle empty objects', () => {
      const input = '{}';
      const output = prettifyJSONC(input);

      expect(output).toBe('{}');
    });

    it('should handle empty arrays', () => {
      const input = '[]';
      const output = prettifyJSONC(input);

      expect(output).toBe('[]');
    });
  });

  describe('stripComments', () => {
    it('should remove single-line comments', () => {
      const input = '{\n  "name": "test" // this is a comment\n}';
      const output = stripComments(input);

      expect(output).not.toContain('// this is a comment');
      expect(output).toContain('"name"');
      expect(output).toContain('"test"');
    });

    it('should remove multi-line comments', () => {
      const input = '{\n  "name": "test",\n  /* this is a\n     multi-line comment */\n  "value": 123\n}';
      const output = stripComments(input);

      expect(output).not.toContain('/* this is a');
      expect(output).not.toContain('multi-line comment */');
      expect(output).toContain('"name"');
      expect(output).toContain('"value"');
    });

    it('should handle mixed comment types', () => {
      const input = `{
  "name": "test", // inline comment
  /* block comment */
  "value": 123
}`;
      const output = stripComments(input);

      expect(output).not.toContain('// inline comment');
      expect(output).not.toContain('/* block comment */');
      expect(output).toContain('"name"');
      expect(output).toContain('"value"');
    });

    it('should not strip comments inside strings', () => {
      const input = '{"text": "This // is not a comment"}';
      const output = stripComments(input);

      expect(output).toContain('This // is not a comment');
    });

    it('should handle JSON without comments', () => {
      const input = '{"name": "test", "value": 123}';
      const output = stripComments(input);

      expect(output).toBe(input);
    });

    it('should handle empty strings', () => {
      const input = '';
      const output = stripComments(input);

      expect(output).toBe('');
    });

    it('should produce valid JSON after stripping comments', () => {
      const input = `{
  "name": "test", // name field
  "value": 123, /* numeric value */
  "active": true
}`;
      const output = stripComments(input);

      // Should be parseable as JSON
      expect(() => JSON.parse(output)).not.toThrow();

      const parsed = JSON.parse(output);
      expect(parsed.name).toBe('test');
      expect(parsed.value).toBe(123);
      expect(parsed.active).toBe(true);
    });
  });

  describe('combined usage', () => {
    it('should strip comments then prettify', () => {
      const input = '{"name":"test",/* comment */"value":123}';
      const stripped = stripComments(input);
      const prettified = prettifyJSONC(stripped);

      expect(prettified).not.toContain('/* comment */');
      expect(prettified).toContain('{\n');
      expect(prettified).toContain('  "name"');
    });
  });
});
