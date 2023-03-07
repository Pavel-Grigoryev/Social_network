import {Paginator} from "./Paginator";
import { create } from "react-test-renderer";

describe("Paginator component test", () => {
    test("pages count is 11 but should showed only 10", () => {
        const component = create(<Paginator paginationGroupSize={10} pageSize={1} currentPage={1} totalItemsCount={11} onPageChanged={()=>{}}/>);
        const instance = component.root;
        const spans = instance.findAllByType('span');
        expect(spans.length).toBe(10);
    });

    test("if pages count is more then 10 button NEXT should be present", () => {
        const component = create(<Paginator paginationGroupSize={10} pageSize={1} currentPage={1} totalItemsCount={11} onPageChanged={()=>{}}/>);
        const instance = component.root;
        const button = instance.findAllByType('button');
        expect(button.length).toBe(1);
    });
});