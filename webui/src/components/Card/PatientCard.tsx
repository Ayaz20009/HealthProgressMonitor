import Card from "@leafygreen-ui/card";

export default function PatientCard({ name }) {
  // const { name, patient_id } = props;

  return (
    <Card className="card-styles" as="article">
      Patient info goes here - {name}
    </Card>
  );
}
