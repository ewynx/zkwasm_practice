
@external("env", "wasm_input")
declare function wasm_input(x: i32): i64

@external("env", "require")
declare function require(x: i32): void

export function read_public_input(): i64 {
    return wasm_input(1);
}

export function read_private_input(): i64 {
    return wasm_input(0);
}

export function fake_hash_single(a: i64): i64 {
  return a * 654;
}

export function fake_hash(a: i64, b: i64): i64 {
  return a * b + 2;
}

// TODO add leaf index
export function hash_merkle_proof(proof_elm0: i64, proof_elm1: i64, proof_elm2: i64, proof_elm3: i64, proof_elm4: i64): i64 {
  // TODO repeated hashing in for loop
  let l1: i64 = fake_hash(proof_elm0, proof_elm1);
  let l2: i64 = fake_hash(proof_elm2, l1);
  let l3: i64 = fake_hash(proof_elm3, l2);
  let root: i64 = fake_hash(proof_elm4, l3);
  return root;
}


export function zkmain(): void {
  let leaf = read_private_input();
  let proof_elm1 = read_private_input();
  let proof_elm2 = read_private_input();
  let proof_elm3 = read_private_input();
  let proof_elm4 = read_private_input();
  
  let hashed_leaf = fake_hash_single(leaf);
  let result: i64 = hash_merkle_proof(hashed_leaf, proof_elm1, proof_elm2, proof_elm3, proof_elm4);
  let root = read_public_input();

  require(result == root);
}
