export type ServiceFaq = { question: string; answer: string };

export type ServiceContent = {
  slug: string;
  title: string;
  pageTitle: string;
  description: string;
  intro: string;
  fit: string[];
  approach: { title: string; body: string }[];
  checks: string[];
  faqs: ServiceFaq[];
  related: string[];
  reading: { title: string; href: string }[];
};

export const services: ServiceContent[] = [
  {
    slug: 'synthetic-data-generation',
    title: 'Synthetic Data Generation',
    pageTitle: 'Synthetic Data Generation for AI Teams',
    description:
      'Plan and evaluate synthetic datasets for model development, edge-case coverage, data access, and privacy-aware testing.',
    intro:
      'Synthetic data is generated from rules, statistical models, simulations, or generative models rather than collected as a direct copy of each real-world record. It can help teams explore data-scarce situations, create controlled test cases, and prepare data for a defined development task. It still needs evidence that it is useful and appropriate for that task.',
    fit: [
      'Rare events or edge cases are too scarce in the available training or evaluation data.',
      'Sensitive records limit access for development, testing, or collaboration.',
      'A simulation or controlled dataset can test how a system responds to known conditions.',
      'The team needs a repeatable data-generation process with documented assumptions.',
    ],
    approach: [
      { title: 'Define the intended use', body: 'Specify the model task, target population, data types, boundaries, and decisions the dataset will support.' },
      { title: 'Choose a generation method', body: 'Select rule-based generation, statistical sampling, simulation, or a generative model based on the structure of the data and the evidence required.' },
      { title: 'Check utility against a real baseline', body: 'Compare distributions and task performance with an appropriate real-data baseline and a held-out evaluation set.' },
      { title: 'Assess privacy and limitations', body: 'Look for memorized or unusually close records, document the threat model and tests used, and state where the data should not be used.' },
    ],
    checks: [
      'Coverage of important classes, time periods, and relevant subgroups.',
      'Plausible relationships between fields, not only matching one-column averages.',
      'Task-level performance on a representative holdout that was not used to generate the synthetic records.',
      'Privacy risk and disclosure controls that match the sensitivity and release context.',
    ],
    faqs: [
      { question: 'Does synthetic data automatically protect privacy?', answer: 'No. The word synthetic is not a privacy guarantee. A generation process can reproduce rare or identifying patterns. Privacy risk needs to be assessed for the method, data, and intended release.' },
      { question: 'How do teams know whether synthetic data is useful?', answer: 'Evaluate it against the specific downstream task. Compare important distributions and relationships, test model performance on an independent real-data holdout when available, and examine failures across relevant subgroups.' },
      { question: 'Can synthetic data replace real data?', answer: 'Sometimes it can support a particular development or testing use, but that conclusion depends on evidence. It should not be assumed to replace real data for every population, task, or deployment decision.' },
      { question: 'What should a project provide before generation begins?', answer: 'A clear intended use, a description of available source data, field definitions, constraints, evaluation criteria, and the privacy or governance requirements for the output.' },
    ],
    related: ['data-quality-assurance', 'data-annotation', 'ai-solutions'],
    reading: [
      { title: 'NIST Privacy Framework', href: 'https://www.nist.gov/privacy-framework' },
      { title: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'data-annotation',
    title: 'Data Annotation',
    pageTitle: 'Data Annotation Services for AI Training',
    description:
      'Design annotation guidelines, expert review, adjudication, and quality checks for text, images, audio, video, and structured data.',
    intro:
      'Data annotation adds context and ground-truth judgments to examples so a model can learn from them or a team can evaluate system behavior. The work may include tagging entities, outlining objects, transcribing speech, linking relationships, or assessing model responses. Consistent results start with a well-defined task and instructions that resolve ambiguity.',
    fit: [
      'Training examples need human judgments that are not present in the source data.',
      'Labels depend on domain context, policy, or nuanced interpretation.',
      'The team needs a documented way to handle disagreement and uncertain examples.',
      'Evaluation requires a reviewed reference set with known scope and limitations.',
    ],
    approach: [
      { title: 'Specify the annotation unit', body: 'Define what one item is, what context annotators can see, and which output fields are required.' },
      { title: 'Write decision rules', body: 'Document label definitions, boundary cases, exclusions, examples, and when an annotator should abstain or escalate.' },
      { title: 'Pilot and calibrate', body: 'Have reviewers label a shared sample independently, compare disagreements, and revise unclear instructions before scaling.' },
      { title: 'Review and adjudicate', body: 'Use risk-based sampling and expert adjudication to identify systematic disagreement and keep a traceable record of guideline changes.' },
    ],
    checks: [
      'Agreement by label and task type, with the metric chosen for the data and decision.',
      'Precision and recall on an expert-reviewed sample where those measures apply.',
      'Disagreement patterns, abstentions, and guideline questions over time.',
      'Coverage of difficult examples and relevant subgroups, not only easy majority cases.',
    ],
    faqs: [
      { question: 'What is the difference between annotation and labeling?', answer: 'The terms overlap. Labeling often describes assigning categories, while annotation can also include richer marks such as spans, boxes, timestamps, relationships, or explanations. The exact meaning should be defined for each project.' },
      { question: 'Does a high agreement score prove the labels are correct?', answer: 'No. Reviewers can consistently apply a flawed guideline. Agreement measures should be paired with expert review, clear definitions, and checks that the task represents the intended use.' },
      { question: 'How many reviewers should label each example?', answer: 'There is no single number for every task. Use risk, ambiguity, cost, and the consequences of an error to decide where independent review or adjudication is needed.' },
      { question: 'What should an annotation guideline include?', answer: 'The task unit, label meanings, positive and negative examples, boundary rules, permitted context, abstention rules, escalation steps, and a process for versioning changes.' },
    ],
    related: ['data-labeling', 'data-quality-assurance', 'synthetic-data-generation'],
    reading: [
      { title: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
    ],
  },
  {
    slug: 'data-labeling',
    title: 'Data Labeling',
    pageTitle: 'Data Labeling for Machine Learning',
    description:
      'Structure classification, extraction, ranking, and transcription tasks with clear label definitions and review for machine learning.',
    intro:
      'Data labeling turns examples into the target values or categories a model is expected to predict. A label set is useful when its categories match the intended decision, its rules are applied consistently, and its quality can be checked. Scaling a confusing label scheme tends to scale the confusion too.',
    fit: [
      'Examples need categories, rankings, attributes, or target values before model training.',
      'The current label set has overlapping categories or frequent edge-case questions.',
      'A training or evaluation set needs measurable review and correction.',
      'Label definitions need to match the real workflow in which model outputs will be used.',
    ],
    approach: [
      { title: 'Map labels to decisions', body: 'Start from the downstream task and define what each label means in observable terms.' },
      { title: 'Set boundaries and examples', body: 'Write inclusion, exclusion, hierarchy, multi-label, and tie-break rules. Include examples from realistic cases.' },
      { title: 'Run a pilot', body: 'Label a representative sample, inspect disagreement and label frequency, and revise the scheme before production.' },
      { title: 'Audit the output', body: 'Sample records for review, monitor category drift, correct systematic errors, and keep dataset versions tied to the label definitions used.' },
    ],
    checks: [
      'Label definitions are mutually understood and support the target decision.',
      'Rare categories and long-tail examples receive appropriate review.',
      'Class distribution is examined without treating imbalance itself as an error.',
      'Changes to categories and guidelines are versioned and reflected in datasets.',
    ],
    faqs: [
      { question: 'How should a team decide on its label categories?', answer: 'Begin with the decisions the model must support, then define categories that can be distinguished from the available evidence. Test the scheme on representative examples before scaling.' },
      { question: 'Should labels be balanced?', answer: 'Not by default. A dataset should reflect the intended use or use a documented sampling and weighting strategy. Artificially balancing it without accounting for that change can distort evaluation.' },
      { question: 'Can one example have several labels?', answer: 'Yes, when the task and model support multi-label outputs. Define whether labels can co-occur, how dependencies work, and how annotators handle uncertain combinations.' },
      { question: 'How do labeling errors affect model evaluation?', answer: 'Incorrect or inconsistent reference labels can obscure real model errors or make a model look worse or better than it is. Evaluate the reference set itself and document its uncertainty.' },
    ],
    related: ['data-annotation', 'data-quality-assurance', 'ai-solutions'],
    reading: [
      { title: 'Google: Rules of Machine Learning', href: 'https://developers.google.com/machine-learning/guides/rules-of-ml' },
    ],
  },
  {
    slug: 'data-quality-assurance',
    title: 'Data Quality Assurance',
    pageTitle: 'Data Quality Assurance for AI Systems',
    description:
      'Profile and validate AI datasets for completeness, validity, consistency, relevance, and production monitoring needs.',
    intro:
      'Data quality is fitness for a defined use, not a universal score. A dataset can be complete but out of date, valid but biased toward one source, or accurate for one workflow and unsuitable for another. A useful assurance process connects checks to the decisions and model behaviors the data supports.',
    fit: [
      'Training data has missing values, inconsistent formats, duplicates, or unexplained changes.',
      'Production inputs differ from the data used during training or evaluation.',
      'Teams need documented thresholds and escalation rules for data defects.',
      'Model failures need to be traced back to source, transformation, or label issues.',
    ],
    approach: [
      { title: 'Set the use and expectations', body: 'Define the intended population, data lineage, required fields, allowed values, freshness needs, and critical failure conditions.' },
      { title: 'Profile representative data', body: 'Measure completeness, distributions, uniqueness, ranges, and relationships across time and relevant slices.' },
      { title: 'Validate before use', body: 'Apply schema and business-rule checks, compare training and serving inputs, and route anomalies for investigation.' },
      { title: 'Monitor and improve', body: 'Track quality signals after deployment, assign ownership for defects, and revise checks as the workflow changes.' },
    ],
    checks: [
      'Completeness of required fields and missingness patterns by source and subgroup.',
      'Validity, range, format, and consistency rules based on the business context.',
      'Duplicate rates, label quality, data lineage, and freshness against the use case.',
      'Changes in training, evaluation, and serving distributions that can affect model behavior.',
    ],
    faqs: [
      { question: 'Which data quality dimensions should we measure?', answer: 'Choose dimensions that affect the intended use. Common checks include completeness, validity, consistency, accuracy, timeliness, uniqueness, relevance, and accessibility, but each needs a clear operational definition.' },
      { question: 'Can data validation prevent every model failure?', answer: 'No. Validation can surface specified data problems and distribution changes, but it cannot anticipate every failure or substitute for model evaluation, monitoring, and human oversight.' },
      { question: 'How often should data quality be checked?', answer: 'Check at the stages where data is created, transformed, used for training, and consumed in production. Frequency depends on how quickly the data and its risks change.' },
      { question: 'What is the difference between drift and a data error?', answer: 'Drift describes a change in data over time relative to a reference. A data error is a defect against an expectation. Drift can be valid, invalid, or simply a signal that needs investigation.' },
    ],
    related: ['data-labeling', 'synthetic-data-generation', 'ai-solutions'],
    reading: [
      { title: 'TensorFlow Data Validation', href: 'https://www.tensorflow.org/tfx/guide/tfdv' },
      { title: 'Google: Monitoring production ML systems', href: 'https://developers.google.com/machine-learning/crash-course/production-ml-systems/monitoring' },
    ],
  },
  {
    slug: 'ai-solutions',
    title: 'AI Solutions',
    pageTitle: 'Production AI Solutions and Implementation',
    description:
      'Move a defined AI use case from data assessment and evaluation through deployment, monitoring, and operational review.',
    intro:
      'A production AI solution connects a model to a real workflow, its users, and its operating constraints. Model selection is one part of the work. Teams also need a measurable objective, appropriate data, a reliable evaluation plan, deployment controls, monitoring, and a route for handling errors and changing requirements.',
    fit: [
      'A team has a specific decision or workflow that can be measured and improved.',
      'A proof of concept needs a path to production and ongoing ownership.',
      'Existing data and models need an independent evaluation before rollout.',
      'Human review, escalation, or governance requirements need to be built into the system.',
    ],
    approach: [
      { title: 'Frame the use case', body: 'Define the user, decision, baseline, acceptable error types, and how success will be measured.' },
      { title: 'Assess data and feasibility', body: 'Review data availability, quality, permissions, representativeness, and integration requirements before selecting an approach.' },
      { title: 'Evaluate against the workflow', body: 'Test with representative and difficult examples, compare with a baseline, and document limitations and review paths.' },
      { title: 'Deploy with operating controls', body: 'Plan release, access, logging, feedback, monitoring, incident handling, and criteria for retraining or rollback.' },
    ],
    checks: [
      'Evaluation data is separated appropriately from development data and represents the intended use.',
      'Quality, latency, cost, privacy, security, and human review needs are measured for the deployment context.',
      'Training and production feature processing are checked for mismatches.',
      'Monitoring and ownership are defined for data changes, model changes, and user feedback.',
    ],
    faqs: [
      { question: 'When is a model ready for production?', answer: 'When it meets agreed task and operational criteria on representative evaluation data, risks have been reviewed, and deployment, monitoring, fallback, and ownership are in place. A strong demo alone is not enough.' },
      { question: 'Does every use case need a custom model?', answer: 'No. The simplest reliable approach may be rules, retrieval, an existing model, or a combination. Choose based on the task, evidence, constraints, and maintenance cost.' },
      { question: 'What should be monitored after launch?', answer: 'Monitor task outcomes and relevant operational signals such as input quality, data or model changes, latency, failures, and human overrides. The exact signals depend on the workflow.' },
      { question: 'How does data quality affect production AI?', answer: 'Changes in source data, labels, transformations, or serving inputs can alter model behavior. Google’s production ML guidance describes training-serving skew and the need to measure it.' },
    ],
    related: ['data-quality-assurance', 'data-annotation', 'synthetic-data-generation'],
    reading: [
      { title: 'NIST AI Risk Management Framework', href: 'https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10' },
      { title: 'Google: Rules of Machine Learning', href: 'https://developers.google.com/machine-learning/guides/rules-of-ml' },
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((service) => [service.slug, service])) as Record<string, ServiceContent>;
