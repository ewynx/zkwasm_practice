# Practice with zkWASM

The intention of this code is to try working with zkWASM and find out what is possible and what not.

Example from https://github.com/DelphinusLab/zkWasm-AssemblyScript-Demo

## Original instructions
(Following https://github.com/DelphinusLab/zkWasm-AssemblyScript-Demo)

1. Install AssemblyScript compiler

```
npm install -g assemblyscript
```

2. Compile your AssemblyScript code

```
asc src/add.ts -O --noAssert -o demo.wasm
```

3. Fetch and Compile zkWasm

```
git clone git@github.com:DelphinusLab/zkWasm.git
cd zkWasm
git submodule update --init
cargo build --release
```

## Test instructions
(Adjusted)

4. Setup, Create proof and Verify proof

This makes a proof running the code in `zkmain` with inputs:
- leaf = 1
- proof_elm1 = 2
- proof_elm2 = 3
- proof_elm3 = 4
- proof_elm4 = 5
- (expected result) root = 78652

```
cd zkWasm
RUST_LOG=info cargo run --release -- --function zkmain --output ./output --wasm ../demo.wasm setup
RUST_LOG=info cargo run --release -- --function zkmain --output ./output --wasm ../demo.wasm single-prove --public 78652:i64 --private 1:i64 --private 2:i64 --private 3:i64 --private 4:i64 --private 5:i64
RUST_LOG=info cargo run --release -- --function zkmain --output ./output --wasm ../demo.wasm single-verify --proof output/zkwasm.0.transcript.data --instance output/zkwasm.0.instance.data
```

## Implementation notes & observations

Tried using https://github.com/ChainSafe/ssz/tree/master/packages/as-sha256, but will give error: `Error: Validation: Unknown opcode 252`

When using array, StaticArray or class, it gives error: `thread 'main' panicked at 'failed to instantiate wasm module: Instantiation("Export abort not found")'`