describe("test describe", () => {
  before(async () => {
    // runs once before the first test in this block
  });

  beforeEach(async () => {
    // runs before each test in this block
  });

  it("test it", async () => {
    await browser.url(`http://google.com/`);
    await browser.pause(3000);
  });

  afterEach(async () => {
    // runs after each test in this block
  });

  after(async () => {
    // runs once after the last test in this block
  });
});
