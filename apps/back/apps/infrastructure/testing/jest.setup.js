// https://github.com/sidorares/node-mysql2/issues/1038#issuecomment-626055892
require('iconv-lite').encodingExists('foo');
const { getConnectionName } = require('@nestjs/typeorm');
const { getNamespace } = require('cls-hooked');
const { getConnection, getConnectionOptions } = require('typeorm');
const {
  initializeTransactionalContext,
  wrapInTransaction,
} = require('typeorm-transactional-cls-hooked');
const {
  getEntityManagerForConnection,
  NAMESPACE_NAME,
} = require('typeorm-transactional-cls-hooked/dist/common');
const dotenv = require('dotenv');
const { useSeeding } = require('typeorm-seeding');

dotenv.config();
jest.setTimeout(30000);
initializeTransactionalContext();

const promiseWrapper = (fn) => {
  return new Promise((resolve, reject) => {
    if (fn.constructor.name === 'AsyncFunction') {
      fn(resolve).catch((err) => reject(err));
    } else if (fn.constructor.name === 'Function') {
      try {
        fn();
        resolve();
      } catch (err) {
        reject(err);
      }
    }
  });
};

// jest it의 실행함수를 감싸는 wrapper 함수
const wrapFn = (fn) => async () => {
  // 테스트코드에서 typeorm init이 되지 않은 경우
  // 테스트코드에서 디비를 사용하지 않는 것이므로, 롤백없이 테스트 실행만하고 종료
  try {
    getConnection();
  } catch (err) {
    await promiseWrapper(fn);
    return;
  }

  const wrapped = wrapInTransaction(async () => {
    try {
      await promiseWrapper(fn);
      const context = getNamespace(NAMESPACE_NAME);
      const connectionName = getConnectionName(await getConnectionOptions());
      const manager = getEntityManagerForConnection(connectionName, context);
      // queryRunner rollbackTransaction 사용시
      // isTransactionActive가 false로 변경되고,
      // 이후 transaction commit이 실행되어 에러 발생
      //
      // isTransactionActive를 변경하지않도록 raw query로 롤백실행
      // await manager.queryRunner?.rollbackTransaction();
      await manager.queryRunner?.query('ROLLBACK');
    } catch (err) {
      throw err;
    }
  });

  await wrapped();
};

// create new object with identical props to original test/it
const jestIt = it;
const patchedBase = (name, fn, timeout) => jestIt(name, wrapFn(fn), timeout);
const patchedOnly = (name, fn, timeout) =>
  jestIt.only(name, wrapFn(fn), timeout);

Object.setPrototypeOf(patchedBase, it);
Object.setPrototypeOf(patchedOnly, it.only);
patchedBase.only = patchedOnly;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
test = it = patchedBase;

beforeAll(async (done) => {
  await useSeeding();
  done();
});
