import { test } from "node:test";
import assert from "node:assert/strict";
import { predictions, myBind, timer } from "./02-this.js";

// ---- Part A: check predictions against reality ----

const obj = {
  value: 42,
  getValue() {
    return this.value;
  },
  getValueArrow: () => this?.value,
};

function actual(fn) {
  try {
    return String(fn());
  } catch (e) {
    return e.constructor.name; // e.g. "TypeError"
  }
}

test("prediction line1: obj.getValue()", () => {
  assert.notEqual(predictions.line1, "", "fill in your prediction first");
  assert.equal(predictions.line1, actual(() => obj.getValue()));
});

test("prediction line2: obj.getValueArrow()", () => {
  assert.notEqual(predictions.line2, "", "fill in your prediction first");
  assert.equal(predictions.line2, actual(() => obj.getValueArrow()));
});

test("prediction line3: detached call", () => {
  assert.notEqual(predictions.line3, "", "fill in your prediction first");
  const g = obj.getValue;
  assert.equal(predictions.line3, actual(() => g()));
});

test("prediction line4: g.call(obj)", () => {
  assert.notEqual(predictions.line4, "", "fill in your prediction first");
  const g = obj.getValue;
  assert.equal(predictions.line4, actual(() => g.call(obj)));
});

test("prediction line5: bound then .call", () => {
  assert.notEqual(predictions.line5, "", "fill in your prediction first");
  const bound = obj.getValue.bind({ value: 7 });
  assert.equal(predictions.line5, actual(() => bound.call(obj)));
});

// ---- Part B ----

test("myBind: binds this", () => {
  function getName() {
    return this.name;
  }
  const f = myBind(getName, { name: "Ada" });
  assert.equal(f(), "Ada");
});

test("myBind: partial application prepends preset args", () => {
  function join(a, b, c) {
    return [this.tag, a, b, c].join("-");
  }
  const f = myBind(join, { tag: "x" }, 1, 2);
  assert.equal(f(3), "x-1-2-3");
});

test("myBind: does not use native bind", () => {
  const src = myBind.toString();
  assert.ok(!/\.bind\(/.test(src), "implement it without Function.prototype.bind");
});

test("timer: tick increments the timer's own count", () => {
  timer.ticks = 0;
  const runThreeTimes = (cb) => {
    cb();
    cb();
    cb();
  };
  timer.start(runThreeTimes);
  assert.equal(timer.ticks, 3);
});
