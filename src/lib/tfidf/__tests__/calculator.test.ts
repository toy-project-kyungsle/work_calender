import { describe, it, expect } from "vitest";
import {
  calculateTF,
  calculateIDF,
  calculateTFIDF,
  calculateAllTFIDF,
} from "../calculator";

describe("calculator", () => {
  describe("calculateTF", () => {
    it("단어 빈도를 정확히 계산한다", () => {
      const tokens = ["프로젝트", "검토", "프로젝트"];
      const tf = calculateTF(tokens);

      expect(tf.get("프로젝트")).toBeCloseTo(2 / 3);
      expect(tf.get("검토")).toBeCloseTo(1 / 3);
    });

    it("빈 배열은 빈 맵을 반환한다", () => {
      const tf = calculateTF([]);
      expect(tf.size).toBe(0);
    });

    it("단일 토큰의 TF는 1이다", () => {
      const tf = calculateTF(["프로젝트"]);
      expect(tf.get("프로젝트")).toBe(1);
    });
  });

  describe("calculateIDF", () => {
    it("IDF를 정확히 계산한다", () => {
      const documents = [
        ["프로젝트", "검토"],
        ["프로젝트", "작성"],
        ["회의", "참석"],
      ];
      const idf = calculateIDF(documents);

      // 프로젝트는 2개 문서에 등장: log(3/2) + 1 ≈ 1.405
      expect(idf.get("프로젝트")).toBeCloseTo(Math.log(3 / 2) + 1);

      // 검토는 1개 문서에 등장: log(3/1) + 1 ≈ 2.099
      expect(idf.get("검토")).toBeCloseTo(Math.log(3 / 1) + 1);

      // 회의는 1개 문서에 등장
      expect(idf.get("회의")).toBeCloseTo(Math.log(3 / 1) + 1);
    });

    it("빈 문서 배열은 빈 맵을 반환한다", () => {
      const idf = calculateIDF([]);
      expect(idf.size).toBe(0);
    });

    it("모든 문서에 등장하는 단어의 IDF는 1이다", () => {
      const documents = [["공통"], ["공통"], ["공통"]];
      const idf = calculateIDF(documents);

      // log(3/3) + 1 = log(1) + 1 = 0 + 1 = 1
      expect(idf.get("공통")).toBe(1);
    });
  });

  describe("calculateTFIDF", () => {
    it("TF-IDF를 정확히 계산한다", () => {
      const tf = new Map([
        ["프로젝트", 0.5],
        ["검토", 0.5],
      ]);
      const idf = new Map([
        ["프로젝트", 1.5],
        ["검토", 2.0],
      ]);
      const tfidf = calculateTFIDF(tf, idf);

      expect(tfidf.get("프로젝트")).toBeCloseTo(0.75);
      expect(tfidf.get("검토")).toBeCloseTo(1.0);
    });

    it("IDF가 없는 토큰은 1을 사용한다", () => {
      const tf = new Map([["새단어", 0.5]]);
      const idf = new Map<string, number>();
      const tfidf = calculateTFIDF(tf, idf);

      expect(tfidf.get("새단어")).toBe(0.5); // 0.5 * 1
    });
  });

  describe("calculateAllTFIDF", () => {
    it("모든 문서의 TF-IDF를 계산한다", () => {
      const documents = [
        ["프로젝트", "검토"],
        ["프로젝트", "작성"],
      ];
      const allTfidf = calculateAllTFIDF(documents);

      expect(allTfidf).toHaveLength(2);
      expect(allTfidf[0].has("프로젝트")).toBe(true);
      expect(allTfidf[0].has("검토")).toBe(true);
      expect(allTfidf[1].has("프로젝트")).toBe(true);
      expect(allTfidf[1].has("작성")).toBe(true);
    });
  });
});
