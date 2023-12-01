import { addLink, removeLink, updateLink, reorderLink } from "./actions";
import { reducer } from "./reducer";

describe("links/reducer()", () => {
  it("should add new links", () => {
    expect(reducer([], addLink())).toEqual([{ url: "https://" }]);
    expect(
      reducer([{ url: "https://alejandro.amerisse.com/" }], { type: "ADD_LINK" }),
    ).toEqual([{ url: "https://alejandro.amerisse.com/" }, { url: "https://" }]);
  });

  it("should remove links", () => {
    expect(
      reducer(
        [
          { url: "https://alejandro.amerisse.com/" },
          { url: "https://alejandro.amerisse.com/about.html" },
        ],
        removeLink(0),
      ),
    ).toEqual([{ url: "https://alejandro.amerisse.com/about.html" }]);
  });

  it("should update links", () => {
    expect(
      reducer(
        [
          { url: "https://alejandro.amerisse.com/" },
          { url: "https://alejandro.amerisse.com/about.html" },
        ],
        updateLink(0, { name: "Tabliss", url: "https://alejandro.amerisse.com/" }),
      ),
    ).toEqual([
      { name: "Tabliss", url: "https://alejandro.amerisse.com/" },
      { url: "https://alejandro.amerisse.com/about.html" },
    ]);
  });

  it("should reorder links", () => {
    expect(
      reducer(
        [
          { url: "https://alejandro.amerisse.com/" },
          { url: "https://alejandro.amerisse.com/about.html" },
          { url: "https://alejandro.amerisse.com/support.html" },
        ],
        reorderLink(1, 0),
      ),
    ).toEqual([
      { url: "https://alejandro.amerisse.com/about.html" },
      { url: "https://alejandro.amerisse.com/" },
      { url: "https://alejandro.amerisse.com/support.html" },
    ]);

    expect(
      reducer(
        [
          { url: "https://alejandro.amerisse.com/" },
          { url: "https://alejandro.amerisse.com/about.html" },
          { url: "https://alejandro.amerisse.com/support.html" },
        ],
        reorderLink(1, 2),
      ),
    ).toEqual([
      { url: "https://alejandro.amerisse.com/" },
      { url: "https://alejandro.amerisse.com/support.html" },
      { url: "https://alejandro.amerisse.com/about.html" },
    ]);
  });

  it("should throw on unknown action", () => {
    expect(() => reducer([], { type: "UNKNOWN" } as any)).toThrow();
  });
});
