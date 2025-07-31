import { XMLBuilder, XMLParser, XMLValidator } from 'fast-xml-parser';
import curry from '@ttls/raw/curried/index.js';

const parser = new XMLParser({
  processEntities: false,
});

const builder = new XMLBuilder();

export const xml = curry({
  
  preFuncs: (input) => {
  // Validate the XML input
  const report = XMLValidator.validate(input);
  if (report !== true) {
    throw new Error(`Invalid XML: ${JSON.stringify(report)}`);
  }

  const doc = parser.parse(input);
  return builder.build(doc);
}});