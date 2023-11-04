# Practice with zkWASM

The intention of this code is to try working with zkWASM and find out what is possible and what not.

Practice projects in:
- AssemblyScript
- Rust

AssemblyScript example from https://github.com/DelphinusLab/zkWasm-AssemblyScript-Demo

Rust example from https://github.com/xgaozoyoe/zkWasm-Rust-Demo

# Get started

Fetch and Compile zkWasm

```
git clone git@github.com:DelphinusLab/zkWasm.git
cd zkWasm
git submodule update --init
cargo build --release
```

# AssemblyScript example 
Source https://github.com/DelphinusLab/zkWasm-AssemblyScript-Demo
The code has been adjusted to perform a fake merkle proof verification. It takes as input the leaf, merkle proof elements and the root. 
"Hashing" a single element is multiplication by 654, and hashing 2 elements a and b results in a*b+2. These are random choices. 

## Build instructions

Install AssemblyScript compiler (only first time build)

```
npm install -g assemblyscript
```

Compile your AssemblyScript code

```
cd assemblyScript
asc src/add.ts -O --noAssert -o assemblyscript_demo.wasm
```


## Test instructions

Move into the `zkWasm` folder to setup, prove and verify proof. 

This makes a proof running the code in `zkmain` with inputs:
- leaf = 1
- proof_elm1 = 2
- proof_elm2 = 3
- proof_elm3 = 4
- proof_elm4 = 5
- (expected result) root = 78652

```
cd ../zkWasm
rm -rf output
mkdir -p output
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../assemblyScript/assemblyscript_demo.wasm setup
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../assemblyScript/assemblyscript_demo.wasm single-prove --public 78652:i64 --private 1:i64 --private 2:i64 --private 3:i64 --private 4:i64 --private 5:i64
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../assemblyScript/assemblyscript_demo.wasm single-verify --proof output/zkwasm.0.transcript.data --instance output/zkwasm.0.instance.data
```

## AssemblyScript implementation notes & observations

Tried using https://github.com/ChainSafe/ssz/tree/master/packages/as-sha256, but will give error: `Error: Validation: Unknown opcode 252`

When using array, StaticArray or class, it gives error: `thread 'main' panicked at 'failed to instantiate wasm module: Instantiation("Export abort not found")'`



# Rust example

Source https://github.com/xgaozoyoe/zkWasm-Rust-Demo

## Compile and Run

Compile Rust code to wasm
```
cd rust
wasm-pack build --release
```

Then move to `zkWasm` folder to execute setup, proving and verification.

```
cd ../zkWasm
rm -rf output
mkdir -p output
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../rust/pkg/rust_demo_bg.wasm setup
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../rust/pkg/rust_demo_bg.wasm single-prove --public 78652:i64
RUST_LOG=info cargo run --release -- -k 19 --function zkmain --output ./output --wasm ../rust/pkg/rust_demo_bg.wasm single-verify --proof output/zkwasm.0.transcript.data --instance output/zkwasm.0.instance.data
```
